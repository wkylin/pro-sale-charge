# 1. Technology Stack

   pro sale charge

## Husky 不起作用解决方案

参考官网：[https://typicode.github.io/husky/#/](https://typicode.github.io/husky/#/)
按以下步骤进行设置：

1. 删除 .git 目录下的 hooks 及 .husky
2. 查看 git config 配置是否存在 core.hookspath=.husky

   ```base
     git config --list
   ```

3. 删除配置及卸载 Huksy:

   ```base
     npm uninstall husky && git config --unset core.hookspath
   ```

4. 再次安装 Husky:

   ```base
     npm install husky --save-dev
     // npm set-script prepare "husky install"
     npx husky-init
   ```

5. 新增 Hooks：

   ```base
     npx husky add .husky/pre-commit "npx lint-staged"
     npx husky add .husky/pre-commit "npx pretty-quick --staged"
     npx husky add .husky/commit-msg 'npx --no-install commitlint --edit'
   ```

   - 目前没有进行 test, 可以先注释掉 .husky/pre-commit 中的 # npm test
