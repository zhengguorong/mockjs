/**
 * Created by monkey1990 on 16/3/7.
 */


function ViewModel(){
    var self=this;
    self.list=ko.observableArray();
    //当前项目
    self.curProject=ko.observable("moonMall");
    self.Item=function(params){
        this.project=ko.observable()
        this.id=ko.observable(params._id||"")
        this.url=ko.observable(params.url||"");
        this.successTpl=ko.observable(params.successTpl||"");
        this.failTpl=ko.observable(params.failTpl||"");
        this.params=ko.observable(params.params||"");
        this.description=ko.observable(params.description||"");
        this.result=ko.observable("");
    }
    self.setCurProject = function(projectName){
        self.curProject(projectName);
        self.getList();
    }
    self.editObj=new self.Item({});//编辑的对象
    self.testObj=new self.Item({});//测试的对象
    self.addObj=new self.Item({});//新增的对象
    self.getList=function(){
        self.list.removeAll();
        $.get("/api/interface",{project:self.curProject()},function(data){
            for(var i=0;i<data.length;i++){
                var item = new self.Item(data[i]);
                self.list.push(item);
            }
        },"json")
    }
    self.delete=function(item){
        $.ajax({
            url:"/api/interface/"+item.id(),
            method:"delete",
            success:function(data){
                self.list.remove(item);
            }
        })
    }
    self.edit=function(item){
        self.editObj.id(item.id());
        self.editObj.url(item.url());
        self.editObj.successTpl(item.successTpl());
        self.editObj.failTpl(item.failTpl());
        self.editObj.params(item.params());
        self.editObj.description(item.description());
    }
    self.test=function(item){
        self.testObj.url(item.url());
        self.testObj.successTpl(item.successTpl());
        self.testObj.params(item.params());
        self.testObj.description(item.description());
        self.request(self.testObj);

    }
    self.request=function(item){
        //拼接请求参数
        $.ajax({
            url:item.url(),
            method:'post',
            data:JSON.parse(item.params()),
            success:function(data){
                item.result(self.syntaxHighlight(data));
            }
        })
    }
    //清楚空格与换行符
    self.tirmEditAll=function(){
        self.editObj.successTpl(self.editObj.successTpl().replace(/\ +/g,"").replace(/[ ]/g,"").replace(/[\r\n]/g,""))
        self.editObj.failTpl(self.editObj.failTpl().replace(/\ +/g,"").replace(/[ ]/g,"").replace(/[\r\n]/g,""))
        self.editObj.params(self.editObj.params().replace(/\ +/g,"").replace(/[ ]/g,"").replace(/[\r\n]/g,""))
    }
    self.tirmAddAll=function(){
        self.addObj.successTpl(self.addObj.successTpl().replace(/\ +/g,"").replace(/[ ]/g,"").replace(/[\r\n]/g,""))
        self.addObj.failTpl(self.addObj.failTpl().replace(/\ +/g,"").replace(/[ ]/g,"").replace(/[\r\n]/g,""))
        self.addObj.params(self.addObj.params().replace(/\ +/g,"").replace(/[ ]/g,"").replace(/[\r\n]/g,""))
    }
    self.update=function(){
        self.editObj.project(self.curProject());
        $.ajax({
            url:'/api/interface/'+self.editObj.id(),
            method:'put',
            data:ko.mapping.toJS(self.editObj),
            success:function(data){
                $('#editModal').modal('hide')
                self.getList();
            }
        })
    }

    self.add=function(){
        self.addObj.project(self.curProject());
        $.ajax({
            url:'/api/interface',
            method:'post',
            data:ko.mapping.toJS(self.addObj),
            success:function(data){
                $('#addModal').modal('hide')
                self.getList();
            }
        })
    }
    self.syntaxHighlight=function(json) {
        if (typeof json != 'string') {
            json = JSON.stringify(json, undefined, 2);
        }
        json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    }
    self.getList();

}

ko.applyBindings(new ViewModel());
