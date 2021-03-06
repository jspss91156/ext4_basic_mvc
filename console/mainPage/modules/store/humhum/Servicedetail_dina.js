Ext.define('Console.store.humhum.Servicedetail_dina', {
    extend: 'Ext.data.Store',
    model: 'Console.model.dina.Service_dina',
    proxy: {
        actionMethods: 'POST',
        type: 'ajax',
        api: {
            read: './modules/source/store/dina/getServicedetail_dina.php',
            destroy: './modules/source/controller/dina/deleteServicedetail_dina.php'
        },
        reader: {
            type: 'json',
            totalProperty: 'total',
            root: 'result'
        },
        writer: {
            type: 'json',
            totalProperty: 'total',
            encode: true,
            root: 'data'
        }
    },
    autoLoad: true
});