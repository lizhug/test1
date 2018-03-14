#题目需求和要点及加分点

要点：
1. 根据设计稿和现有的页面实现移动端功能
2. 使用scss/less/sass进行样式开发
3. 使用vue进行逻辑（Js的开发）
4. html要求与样式、js文件分离
5. 从此仓库下载代码进行二次开发

功能需求：
1. 按设计稿(Page1.png)实现页面
2. 红点标注的选项为必选项，如Phone Number*
3. 有下拉箭头的是选择项  Industy项选项有['Apple', 'Orange', 'Pink'],Hometown项选项有['Beijing', 'Shanghai', 'Nanjing'],
   Personality选项有['Good Boy', 'Bad Girl', 'Beautiful Women'], Birthday使用系统自带的时间选择input type='date'
4. 用vue实现上述功能，页面内类名、命名由自己把握
5. 共有5项信息、Phone Number至Personality，用户选择完数据后，提交数据给后台，后台接收格式
      
      请求方式:POST
      请求地址:http://www.test.com/submit_data
      请求参数格式(JSON):
        {
            phone: '15500000000'
            birthday: '2014-11-11'
            industry: 'Apple'
            hometown: 'Shanghai'
            personality: 'Bad Girl'
        }
 6. 点击Phone Number会有弹窗（Dialog.png），如果用户有输入东西点击done就可以关闭，如果没有输入电话号码则无法点击done关闭，可以试用cancel关闭
 7. 输入了phone，选择了industry选项后，右侧会显示对应的内容（Page2.png）
 
 
加分点：
1. 规范的命名与优雅的代码格式、包括注释
2. 把开发完成后的代码推送到此仓库的feature-xxx分支（xxx是你的名字全拼，如feature-zhangquandan）
          
