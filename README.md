# myfirstProject

本次第一次上传项目，总结下上传步骤：

上传中出现的问题以及解决方案：

操作把本地仓库代码上传到githubgit时： push -u origin master
 出现以下语句：
 
failed to push some refs to 'git@github.com:vidahouseCindy/myfirstRepository.git'
 ! [rejected]        master -> master (fetch first)
 
error: failed to push some refs to 'git@github.com:vidahouseCindy/myfirstRepository.git'

hint: Updates were rejected because the remote contains work that you do

hint: not have locally. This is usually caused by another repository pushing

hint: to the same ref. You may want to first integrate the remote changes

hint: (e.g., 'git pull ...') before pushing again.

hint: See the 'Note about fast-forwards' in 'git push --help' for details.

&&原因：github上的readme.md文件不在本地代码目录中

通过如下命令进行代码合并【注：pull=fetch+merge]

git pull --rebase origin master

然后再上传到github,push -u origin master
