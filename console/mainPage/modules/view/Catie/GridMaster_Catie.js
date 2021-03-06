Ext.define('Console.view.Catie.GridMaster_Catie', {
    extend: 'Console.override.Grid',
    alias: 'widget.ctgridmaster',

    requires: [
        'Ext.ux.ProgressBarPager',
        'Ext.ux.form.SearchField'
    ],

    plugins: [
        {
            ptype: 'rowexpander',
            rowBodyTpl: new Ext.XTemplate(
                '<div class="rowexpander-row">',
                '<p><b>' + MSG['created_date'] + ':</b> {registration_date}</p>',
                '</div>'
            )
        }
    ],

    selType: 'checkboxmodel',


    config: {
        store: 'Catie.ServiceInfo_Catie'
    },

    initComponent: function() {
        var me = this;

        Ext.apply(me, {
            store: me.getStore(),
            columns: [
                {
                    header: MSG['id_ct'],
                    dataIndex: 'student_id',
                    flex: 1
                },
                {
                    header: MSG['name_ct'],
                    dataIndex: 'name',
                    flex: 1
                },  {
                    header: MSG['gender_ct'],
                    dataIndex: 'gender',
                    flex: 1
                }, {
                    header: MSG['email_ct'],
                    dataIndex: 'email',
                    flex: 1
                },{
                    header: MSG['phone_ct'],
                    dataIndex: 'phone',
                    flex: 1
                }, {
                    header: MSG['address_ct'],
                    dataIndex: 'address',
                    flex: 1
                },{
                    header: MSG['birthday_ct'],
                    dataIndex: 'birthday',
                    flex: 1
                }
            ],
            tbar: [
                {
                    text: MSG['add_user'],
                    action: 'add_user'
                }, {
                    text: MSG['edit_user'],
                    action: 'edit_user',
                    allowMulti: false,
                    disabled: true
                }, {
                    text: MSG['delete_user'],
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
                store: me.getStore(),
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            }
        });

        me.callParent(arguments);
    }
});