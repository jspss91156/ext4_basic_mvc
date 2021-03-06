Ext.define('Console.view.betty.FormEdit_betty', {
	extend: 'Console.override.Form',
	alias: 'widget.bettyformedit',

	requires: ['Ext.layout.container.Anchor'],

	layout: 'anchor',//頁面布局

   
    //以上是檔案基本定義

    //性別下拉式選單
	initComponent: function() {
        var me = this;
        var states = Ext.create('Ext.data.Store', {
            fields: ['abbr', 'name'],
            data : [
                {"abbr":"男", "name":"男"},
                {"abbr":"女", "name":"女"},
                {"abbr":"其他", "name":"其他"}
            ]
        });

		Ext.apply(me, {
			width: 450,
			bodyPadding: 5,
            autoScroll: true,
			defaults: {
                anchor: '100%'
            },
			defaultType: 'textfield',
			fieldDefaults: {
	            msgTarget: 'under',
	            autoFitErrors: false
	        },
			items: [
                {
                    xtype:'displayfield',
                    name: 'student_id',
                    fieldLabel: MSG['student_id_t'],//學號
                   
                }, {
                    name: 'name',
                    fieldLabel: MSG['name_t'],//姓名
                    maxLength: 50,
                    allowBlank: false
    			}, {
                    xtype: 'combo',
                    name: 'gender',
                    fieldLabel: MSG['gender_t'],//性別
                    queryMode: 'local',
                    store: states,
                    displayField: 'name',
                    valueField: 'abbr',
                    forceSelection: true,
                    flex: 1,
                    maxLength: 2
                }, {
                    name: 'email',
                    fieldLabel: MSG['email_t'],//信箱
                    maxLength: 100,
                    vtype: 'email',
                    allowBlank: true
                },{
                    vtype: 'cellphone',
    				name: 'phone',
                    maxLength: 10,
    				fieldLabel: MSG['mobile_number_t'],//電話
                    allowBlank: true
    			},{
                    name: 'address',
                    maxLength: 200,
                    fieldLabel: MSG['address_t'],//地址
                    allowBlank: true
                },{
                    xtype: 'datefield',
                    name: 'birthday',
                    fieldLabel: MSG['birthday_t'],//生日
                    allowBlank: true,
                    format: 'Y-m-d',
                    editable: false
                }
                
			],
			bbar: [
    			{
    				text: MSG['confirm_t'],//確認
                    action: 'form_confirm'
    			}, {
    				text: MSG['cancle_t'],//取消
                    action: 'form_cancel'
    			}
			]
		});

		me.callParent(arguments);
	}
});