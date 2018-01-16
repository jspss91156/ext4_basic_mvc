Ext.define('Console.model.GasStation', {
	extend: 'Ext.data.Model',
	fields: [
    	{
            name:'station_id',
            type:'string'
        },{
            name:'brand_id',
            type:'string'
        },{
            name:'station_code',
            type:'string'
        },{
            name:'station_name',
            type:'string'
        },{
            name:'address_city',
            type:'string'
        },{
            name:'address_county',
            type:'string'
        },{
            name:'station_address',
            type:'string'
        },{
            name:'gps_latitude',
            type:'string'
        },{
            name:'gps_longitude',
            type:'string'
        },{
            name:'service_time',
            type:'string'
        },{
            name:'service_type',
            type:'string'
        },{
            name:'gas_type',
            type:'string'
        },{
            name:'phone',
            type:'string'
        },{
            name:'priority',
            type:'string'
        },{
            name:'start_date',
            type:'string'
        },{
            name:'expire_date',
            type:'string'
        },{
            name:'hand_gasoline_offer',
            type:'string'
        },{
            name:'self_gasoline_offer',
            type:'string'
        },{
            name:'diesel_offer',
            type:'string'
        },{
            name:'created_date',
            type:'string'
        },{
            name:'updated_date',
            type:'string'
        },{
            name:'operator',
            type:'string'
        },{
            name:'address',
            type:'string'
        }
	]
});