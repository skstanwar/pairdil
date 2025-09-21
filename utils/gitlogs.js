// gitLogs.js
import { exec } from "child_process";

export function getGitLogs() {
  return new Promise((resolve, reject) => {
    const gitCommand = `git log --pretty=format:"%h|%an|%ad|%s" --date=short`;
    exec(gitCommand, (err, stdout, stderr) => {
      if (err) return reject(err);
      const logs = stdout.split("\n").map((line) => {
        const [hash, author, date, message] = line.split("|");
        return { hash, author, date, message };
      });
      resolve(logs);
    });
  });
}
