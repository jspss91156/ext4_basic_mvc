Ext.define('Console.view.GasBrand.GridMaster', {
	extend: 'Console.override.Grid',
	alias: 'widget.gbgridmaster',
// 外框
	requires: [
		'Ext.ux.ProgressBarPager',
		'Ext.ux.form.SearchField'
	],

	selType: 'checkboxmodel',
// 勾勾
    config: {
        store: 'GasBrandDetail'
    },
//存取路徑
	initComponent: function() {
        var me = this;

		Ext.apply(me, {
			store: me.getStore(),
			columns: [
                 {
                    header: MSG['brand_id'],
                    // MSG['顯示名稱']
                    dataIndex: 'brand_id',
                    // 對應資料欄位
                    flex: 1,
                    // 顯示框架比例
                    hidden:true
                },  {
                    header: MSG['brand_name'],
                    dataIndex: 'brand_name',
                    flex: 1
                },  {
                    header: MSG['brand_logo'],
                    dataIndex: 'brand_logo',
                    flex: 2,
                     renderer: function(value, p, r) {
                        return me.renderImage(this, r.data['brand_logo']);
                    }
                }, {
                    header: MSG['web_url'],
                    dataIndex: 'web_url',
                    flex: 3
                },{
                    header: MSG['priority'],
                    dataIndex: 'priority',
                    flex: 1
                }, {
                    header: MSG['contract_status'],
                    dataIndex: 'contract_status',
                    flex: 1
                },{
                    header: MSG['hand_gasoline_offer'],
                    dataIndex: 'hand_gasoline_offer',
                    flex: 1
                },{
                    header: MSG['self_gasoline_offer'],
                    dataIndex: 'self_gasoline_offer',
                    flex: 1
                },{
                    header: MSG['diesel_offer'],
                    dataIndex: 'diesel_offer',
                    flex: 1
                },{
                    header: MSG['reward_point'],
                    dataIndex: 'reward_point',
                    flex: 1
                },{
                    header: MSG['reward_info'],
                    dataIndex: 'reward_info',
                    flex: 2
                },{
                    header: MSG['created_date'],
                    dataIndex: 'created_date',
                    flex: 3
                },{
                    header: MSG['updated_date'],
                    dataIndex: 'updated_date',
                    flex: 3
                },{
                    header: MSG['operator'],
                    dataIndex: 'operator',
                    flex: 1
                }
            ],
            tbar: [
                {
                    text: MSG['add'],
                    action: 'add_user'
                }, {
                    text: MSG['edit'],
                    action: 'edit_user',
                    allowMulti: false,
                    disabled: true
                }, {
                    text: MSG['delete'],
                    action: 'delete_user',
                    allowMulti: true,
                    disabled: true
                }, '->', {
                    xtype: 'searchfieldmvc',
                    store: me.getStore(),
                    fieldLabel: MSG['search'],
                    labelWidth: 50,
                    width: 200
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                // 
                store: me.getStore(),
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            }

        });

        me.callParent(arguments);
    }
});