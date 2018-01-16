Ext.define('Console.controller.humhum_detail', {
    extend: 'Ext.app.Controller',

    stores: [
        'humhum.store_humhum',
        'humhum.masterdetail'


    ],
    models: [
        'humhum.model_humhum',
        'humhum.Detail'
    ],
    views: [
        'humhum_master_detail.Detail_GridMaster_humhum',
        'humhum_master_detail.New_TabPanel_humhum',
        'humhum_master_detail.master_plus_detail',
        'humhum_master_detail.Detail_ActionPanel',
        'humhum_master_detail.Detail_FormAdd',
        'humhum_master_detail.Detail_FormEdit',
        'humhum_master_detail.Detail'
    ],

    refs: [
        {
             ref: 'actionPanel',
             selector: 'detail_actionpanel'
        }, {
             ref: 'gridMaster',
             selector: 'detailgridmaster'
        }, {
             ref: 'gridDetail',
             selector: 'detail'
        }, {
            ref: 'formAddDetail',
            selector: 'detail_formadd'
        }, {
            ref: 'formEditDetail',
            selector: 'detail_formedit'
        }
        
    ],

    config: {
        FormAddTitle: '新增成績',
        FormEditTitle: '修改成績',
        addServiceCategoryUrl: './modules/source/controller/humhum_master_detail/add_detail_humhum.php',
        editServiceCategoryUrl: './modules/source/controller/humhum_master_detail/edit_detail_humhum.php'
    },

    init: function() {
        var me = this;

        me.control({
            'detailgridmaster': {
                select: me.selectMasterList,
                deselect: me.deselectMasterList
            },
            'detail': {
                select: me.selectDetailList,
                deselect: me.deselectDetailList
            },            
            'detail button[action=detail_add_user]': {
                click: me.addDetail
            },
            'detail button[action=detail_edit_user]': {
                click: me.editDetail
            },
            'detail button[action=detail_delete_user]': {
                click: me.deleteServiceCategory
            },
            'detail_formadd button[action=detail_add_confirm]': {
                click: me.addServiceCategoryConfirm
            },
            'detail_formadd button[action=detail_add_cancel]': {
                click: me.formCancel
            },
            'detail_formedit button[action=detail_edit_confirm]': {
                click: me.editServiceCategoryConfirm
            },
            'detail_formedit button[action=detail_edit_cancel]': {             
                click: me.formCancel
            }
        });
    },
    checkSession: function() {
        var me = this;
        var isSessionExist = me.getController('Viewport').checkUserSessionExist();

        if (! isSessionExist) {
            return;
        }
    },

    showForm: function(formPanel, title) {
        var me = this;
        me.checkSession();

        var actionPanel = me.getActionPanel(),
            isCollapse = actionPanel.getCollapsed();
            isHidden = formPanel.isHidden();

        formPanel.getForm().reset();

        if (isHidden && ! isCollapse) {
            Ext.MessageBox.show({
                title: MSG['msg_box_info'],
                msg: MSG['plz_close'],
                width: 300,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.INFO
            });
        } else if (! isHidden && ! isCollapse) {

        } else {
            formPanel.show();
            formPanel.body.dom.scrollTop = 0;
            actionPanel.setTitle(title);
            actionPanel.doLayout();
            actionPanel.expand(true);
        }
    },

    hideForm: function(formPanel) {
        var me = this;
        me.checkSession();

        var actionPanel = me.getActionPanel(),
            form = formPanel.getForm()

        actionPanel.collapse(Ext.Component.DIRECTION_RIGHT, true);
        form.reset();
        formPanel.hide();
        actionPanel.doLayout();
    },
   loadMasterFormRecord: function(form, record) {
        var me = this;
        // var image = me.getFormEditMasterImage();
        // var display = me.getFormEditMasterDisplay();
        // var dcTime = '?' + (new Date()).getTime();
        // var category_icon = record.get('category_icon') + dcTime;
        // var category_url = Ext.decode(record.get('category_url'));
        // if (category_icon == '' || category_icon == null){
        //     display.setRawValue('沒有圖片');
        // } else {
        //     display.setRawValue(null);
        // }

        form.loadRecord(record);
        // image.setSrc(category_icon);
    },


     
    selectMasterList: function(obj, record, index, eOpts) {
        var me = this;
        var count = obj.getCount();      /*返回當前的數據總數*/
        var store = me.getGridDetail().getStore();
        var formEdit = me.getFormEditDetail(); 

        if (count == 1) {                                                   /*再說按master，detail會有資料，如果沒案或案2個以上，就沒有東西*/
            store.clearFilter(true);  //clearFilter:取消過濾並顯示所有數據
            store.filter([  //filter:在store內過濾資料
                {property: 'student_id', value: record.get('student_id')}
            ]);
            store.reload(); //類似重制的意思
            // me.loadMasterFormRecord(formEdit, record);
        } else {
            store.removeAll();  //removeAll:空整個store中的數據
        }
    },

    deselectMasterList: function(obj, record, index, eOpts) {
        var me = this;
        var count = obj.getCount();
        var store = me.getGridDetail().getStore();
        var formEdit = me.getFormEditDetail();

        if (count == 1) {
            var deselectRecord = obj.selected.items[0];
            me.loadMasterFormRecord(formEdit, deselectRecord);

            store.clearFilter(true);
            store.filter('student_id', deselectRecord.get('student_id'));

            store.reload();
        } else {
            store.removeAll();
        }
    },

    selectDetailList: function(obj, record, index, eOpts) {
        var me = this;
        var count = obj.getCount();
        var formEdit = me.getFormEditDetail();

        if (count == 1) {
            me.loadDetailFormRecord(formEdit, record);  //取下紀錄
        } else {
            formEdit.getForm().reset();

        }
    },


    deselectDetailList: function(obj, record, index, eOpts) {
        var me = this;
        var count = obj.getCount();
        var formEdit = me.getFormEditDetail();

        if (count == 1) {
            var deselectRecord = obj.selected.items[0];
            me.loadDetailFormRecord(formEdit, deselectRecord);
        } else {
            formEdit.getForm().reset();
        }
    },

   loadDetailFormRecord: function(form, record) {
        form.loadRecord(record);
    },

    addDetail: function(btn){
        var me = this;
        var form = me.getFormAddDetail(),
            title = me.getFormAddTitle(),
            store = me.getGridDetail().getStore();
        var record = me.getGridMaster().getSelectionModel().getSelection()[0];
        var student_id = record.data['student_id'];


        me.showForm(form, title);
        form.getForm().findField('student_id').setValue(student_id);
    },


    addServiceCategoryConfirm: function(btn){
        var me = this;
        me.checkSession();

        var actionPanel = me.getActionPanel();
        var formPanel = me.getFormAddDetail();
        var grid = me.getGridDetail();
        var store = grid.getStore();
        var form = formPanel.getForm();
        var record = me.getGridMaster().getSelectionModel().getSelection()[0];
        //getGridMaster() getGridDetail() 傻傻分不清呀...
        // check value
        if (! form.isValid()) {
            return;
        }
        //form.findField('student_id').setValue(record.data['student_id']);

        form.submit({
            url: me.getAddServiceCategoryUrl(),
            method: 'POST',
            success: function() {
                actionPanel.collapse(Ext.Component.DIRECTION_RIGHT, true);

                Ext.MessageBox.show({
                    title: MSG['msg_box_info'],
                    msg: MSG['add_success'],
                    width: 300,
                    buttons: Ext.MessageBox.OK,
                    fn: function(btn) {
                        if (btn == 'ok') {
                            grid.afterRequest(store, formPanel);
                        }
                    },
                    icon: Ext.MessageBox.INFO
                });
            },

            failure: function(obj, action) {
                var error_msg = null;

                store.reload();

                switch (action.failureType) {
                    case Ext.form.action.Action.CLIENT_INVALID:
                        error_msg = MSG['form_invalid'];
                        break;
                    case Ext.form.action.Action.CONNECT_FAILURE:
                        error_msg = MSG['server_connect_fail'];
                        break;
                    case Ext.form.action.Action.SERVER_INVALID:
                        error_msg = action.result.msg;
                        break;
                }

                Ext.MessageBox.show({
                    title: MSG['msg_box_error'],
                    msg: error_msg,
                    width: 300,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        });

    },

    editDetail: function(btn) {
        var me = this;
        var form = me.getFormEditDetail(),
            title = me.getFormEditTitle(),
            record = me.getGridDetail().getSelectionModel().getSelection()[0];

        me.showForm(form, title);
        //me.loadFormReocrd(form, record);
        me.loadDetailFormRecord(form, record);
    },

    editServiceCategoryConfirm: function(btn) {
        var me = this;
        me.checkSession();

        var actionPanel = me.getActionPanel();
        var formPanel = me.getFormEditDetail();
        var gridDetail = me.getGridDetail();
        var storeDetail = gridDetail.getStore();
        var form = formPanel.getForm();

        // check value
        if (! form.isValid()) {
            return;
        }

        form.submit({
            url: me.getEditServiceCategoryUrl(),
            method: 'POST',
            success: function(fp, action) {
                actionPanel.collapse(Ext.Component.DIRECTION_RIGHT, true);

                Ext.MessageBox.show({
                    title: MSG['msg_box_info'],
                    msg: MSG['edit2_success'],
                    width: 300,
                    buttons: Ext.MessageBox.OK,
                    fn: function(btn) {
                        if (btn == 'ok') {
                            gridDetail.afterRequest(storeDetail, formPanel);
                        }
                    },
                    icon: Ext.MessageBox.INFO
                });
            },

            failure: function(obj, response) {
                Ext.MessageBox.show({
                    title: MSG['msg_box_error'],
                    msg: response.result.msg,
                    width: 300,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR,
                    fn: function(btn) {
                        if(btn == 'ok') {
                            store.reload();
                        }
                    }
                });
            }
        });
    },
   // deleteServiceCategoryDetail: function(btn){
   //      var me = this;
   //      me.checkSession();

   //      var grid = me.getGridDetail();
   //      this.deleteServiceCategoryData(grid);
   //  },
   
      deleteServiceCategory: function(grid){
        var me = this;
        me.checkSession();
        //var store = grid.getStore(),
       var grid = me.getGridDetail(),
           store = grid.getStore(),
            record = grid.getSelectionModel().getSelection(),
            length = record.length,
            msg = MSG['delete_confirm_header'] + length + MSG['delete_confirm_footer'];

        Ext.MessageBox.show({
            title: MSG['msg_box_info'],
            msg: msg,
            width: 300,
            buttons: Ext.MessageBox.YESNO,
            fn: function(btn) {
                if (btn == 'yes') {
                    store.remove(record);

                    store.sync({
                        success: function() {
                            Ext.MessageBox.show({
                                title: MSG['msg_box_info'],
                                msg: MSG['delete_success'],
                                width: 300,
                                buttons: Ext.MessageBox.OK,
                                fn: function(btn) {
                                    if (btn == 'ok') {
                                        grid.afterRequest(store, null);
                                    }
                                },
                                icon: Ext.MessageBox.INFO
                            });
                        },

                       failure: function() {
                            Ext.MessageBox.show({
                                title: MSG['msg_box_info'],
                                msg: MSG['delete_fail'],
                                width: 300,
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.ERROR
                            });
                            store.reload();
                        }
                    });
                }
            }
        });
    },

    formCancel: function(btn) {
        var me = this;
        var form = btn.up('form');

        me.hideForm(form);
    }
});

