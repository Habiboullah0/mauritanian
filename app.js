const fs = require('fs').promises;
const path = require('path');

async function renameFilesInDir(dirPath) {
  try {
    const entries = await fs.readdir(dirPath);

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry);
      const stat = await fs.stat(fullPath);

      if (stat.isFile() && path.extname(entry).toLowerCase() === '.mp3') {
        const match = entry.match(/^(\d+)\s.*(\.mp3)$/i);
        if (match) {
          const newName = `${match[1]}${match[2]}`;
          const newPath = path.join(dirPath, newName);
          if (entry !== newName) {
            await fs.rename(fullPath, newPath);
            console.log(`Renamed: '${entry}' -> '${newName}'`);
          }
        }
      }
    }
    console.log('Renaming completed.');
  } catch (error) {
    console.error('Error while renaming files:', error);
  }
}

// Entry point
(function () {
  const args = process.argv.slice(2);
  if (args.length !== 1) {
    console.error('Usage: node app.js /path/to/folder');
    process.exit(1);
  }

  const targetDir = args[0];
  renameFilesInDir(targetDir);
})();