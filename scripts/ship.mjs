// Send the current branch to master through a pull request that merges itself once CI passes.
//
//   yarn ship
//
// Pushes the branch, opens a PR (or reuses the open one) and turns on auto-merge.
// master only accepts changes whose `test` check passed, and merging deploys the site.
import { execFileSync } from 'node:child_process';

const read = (cmd, args, options = {}) => execFileSync(cmd, args, { encoding: 'utf8', ...options }).trim();

// gh may be logged in to several accounts; act as the repo owner, not whichever one is active
const owner = read('git', ['remote', 'get-url', 'origin']).match(/github\.com[:/]([^/]+)\//)?.[1];
const env = { ...process.env };
if (owner && !env.GH_TOKEN) {
  try {
    env.GH_TOKEN = read('gh', ['auth', 'token', '--user', owner]);
  } catch {
    // Not logged in as the owner; fall back to gh's active account
  }
}
const run = (cmd, args) => execFileSync(cmd, args, { stdio: 'inherit', env });

const branch = read('git', ['rev-parse', '--abbrev-ref', 'HEAD']);
if (branch === 'master' || branch === 'HEAD') {
  console.error('請在分支上執行（例：git switch -c post/<slug>），master 不能直接推。');
  process.exit(1);
}
// Untracked files (drafts still being written) are fine; uncommitted edits would be left behind
if (read('git', ['status', '--porcelain', '--untracked-files=no'])) {
  console.error('還有修改沒 commit，不會被送出。先 commit 或 git stash 再執行。');
  process.exit(1);
}

run('git', ['push', '-u', 'origin', branch]);

let hasPr = true;
try {
  read('gh', ['pr', 'view', branch, '--json', 'number'], { env, stdio: 'pipe' });
} catch {
  hasPr = false;
}
if (!hasPr) run('gh', ['pr', 'create', '--base', 'master', '--head', branch, '--fill']);
run('gh', ['pr', 'merge', branch, '--auto', '--merge', '--delete-branch']);

console.log(`
已送出 ${branch}：測試通過後會自動 merge 到 master 並部署。
看進度：gh pr checks ${branch} --watch
上線後整理本機：git switch master && git pull && git branch -d ${branch}`);
