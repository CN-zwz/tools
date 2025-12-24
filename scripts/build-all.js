/*部分代码使用 AI 生成*/
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const subProjectsRoot = path.resolve(__dirname, '../projects');
const root = path.resolve(__dirname, '..');

/**
 * 执行一个同步的 shell 命令并将其输出直接继承到当前进程的 stdio。
 *
 * 在执行前会在控制台打印出将要运行的命令及工作目录（若未提供 cwd，则使用外部的 `root` 变量）。
 *
 * @param {string} cmd - 要执行的 shell 命令。
 * @param {string} [cwd] - 可选的工作目录；若未提供则使用外部的 `root`。
 * @returns {void}
 * @throws {Error} 当命令执行失败时，会抛出由 child_process.execSync 产生的异常。
 */
function run(cmd, cwd) {
    console.log(`> ${cmd} (cwd: ${cwd || root})`);
    execSync(cmd, { cwd: cwd || root, stdio: 'inherit' });
}

function copyRecursive(src, dest) {
    fs.rmSync(dest, { recursive: true, force: true });
    fs.mkdirSync(dest, { recursive: true });
    // Prefer fs.cpSync when available
    if (fs.cpSync) {
        fs.cpSync(src, dest, { recursive: true });
    } else {
        // fallback simple recursive copy
        const entries = fs.readdirSync(src, { withFileTypes: true });
        for (const ent of entries) {
            const srcPath = path.join(src, ent.name);
            const destPath = path.join(dest, ent.name);
            if (ent.isDirectory()) {
                copyRecursive(srcPath, destPath);
            } else {
                fs.mkdirSync(path.dirname(destPath), { recursive: true });
                fs.copyFileSync(srcPath, destPath);
            }
        }
    }
}

function simpleBuild(projectDir, destDir) {
    console.log(`Installing ${projectDir} dependencies...`);
    run('npm ci', path.join(subProjectsRoot, projectDir));
    console.log(`Building ${projectDir}...`);
    run('npm run build', path.join(subProjectsRoot, projectDir));
    // detect output dir
    const candidates = ['build', 'dist'];
    let outDir = null;
    for (const c of candidates) {
        const p = path.join(subProjectsRoot, projectDir, c);
        if (fs.existsSync(p)) { outDir = p; break; }
    }
    if (!outDir) {
        console.error(`${projectDir} 构建产物未找到（检查 ${projectDir}/build）`);
        process.exit(1);
    }

    console.log(`Copying ${projectDir} build from ${outDir} -> ${destDir}`);
    copyRecursive(outDir, destDir);
}

function copyStaticProject(projectDir, destDir) {
    console.log(`Copying ${projectDir} static files...`);
    const src = path.join(subProjectsRoot, projectDir);
    const dest = destDir || path.join(subProjectsRoot, 'build', projectDir.toLowerCase());
    fs.rmSync(dest, { recursive: true, force: true });

    const exts = new Set(['.html', '.css', '.js', '.png', '.jpg', '.jpeg', '.svg', '.gif', '.ico', '.json']);
    function walkAndCopy(srcRoot, cur) {
        const entries = fs.readdirSync(cur, { withFileTypes: true });
        for (const ent of entries) {
            const srcPath = path.join(cur, ent.name);
            if (ent.isDirectory()) {
                walkAndCopy(srcRoot, srcPath);
            } else {
                const ext = path.extname(ent.name).toLowerCase();
                if (exts.has(ext)) {
                    const rel = path.relative(srcRoot, srcPath);
                    const destPath = path.join(dest, rel);
                    fs.mkdirSync(path.dirname(destPath), { recursive: true });
                    fs.copyFileSync(srcPath, destPath);
                }
            }
        }
    }

    walkAndCopy(src, src);
}

try {
    // 0.1 Copy static assets(/assests) to /build
    console.log('Step 0.1: Copying static assets...');
    const staticSrc = path.join(root, 'static');
    const staticDest = path.join(root, 'build');
    try {
        copyRecursive(staticSrc, staticDest);
    } catch (err) {
        console.warn('Failed to copy static assets:', err);
    }

    // 0.2 convert root README to HTML -> /build/index.html
    try {
        const readmeCandidates = ['README.md', 'README.MD', 'README'];
        let readmePath = null;
        for (const r of readmeCandidates) {
            const p = path.join(root, r);
            if (fs.existsSync(p)) { readmePath = p; break; }
        }

        if (readmePath) {
            console.log(`Step 0.2: Converting ${path.basename(readmePath)} -> build/index.html`);
            const buildDir = path.join(root, 'build');
            fs.mkdirSync(buildDir, { recursive: true });
            const outPath = path.join(buildDir, 'index.html');

            // Try to use `marked`
            // Fallback to a very small safe wrapper if `marked` isn't available.
            let htmlContent;
            try {
                run(`marked "${readmePath}" -o "${outPath}"`);
                htmlContent = fs.readFileSync(outPath, 'utf8');
            } catch (e) {
                console.warn('marked failed, falling back to simple plaintext wrapper.');
                const md = fs.readFileSync(readmePath, 'utf8');
                const escaped = md.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                htmlContent = '<pre style="white-space:pre-wrap">' + escaped + '</pre>';
            }

            const fullHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>README</title>
    <link rel="stylesheet" href="style/marked-styles.css">
</head>
<body>
    ${htmlContent}
</body>
</html>`;
            fs.writeFileSync(outPath, fullHtml, 'utf8');
        } else {
            console.warn('No README found in project root, skipping README -> HTML conversion.');
        }
    } catch (err) {
        console.error('Failed to convert README to HTML:', err);
        // don't abort whole build for README failures; just warn
    }

    // 1. handle hidden-word(should be built)
    console.log('Step 1: Building hidden-word project...');
    simpleBuild('hidden-word', path.join(root, 'build', 'hidden-word'));

    // 2. handle PixelJihad
    console.log('Step 2: Copying PixelJihad static project...');
    copyStaticProject('PixelJihad', path.join(root, 'build', 'pixeljihad'));

    console.log('Build finished.');
} catch (err) {
    console.error(err);
    process.exit(1);
}