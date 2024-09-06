frappe.ui.form.on('Digital Asset Assignment', {
    refresh: function(frm) {
        // Add a custom button to return the asset
        if (frm.doc.status === 'Active') {
            frm.add_custom_button(__('Return Asset'), function() {
                frm.set_value('status', 'Returned');
                frm.save();
            });
        }
    },
    before_save: function(frm) {
        // Automatically set status based on conditions
        if (frm.doc.digital_asset) {
            frappe.db.get_value('Digital Asset', frm.doc.digital_asset, 'status', (r) => {
                if (r.status == 'Available') {
                    frm.set_value('status', 'Active');
                }
            });
        }
    },
    onload: function(frm) {
        // Filter the Digital Asset field to show only assets with status 'Available'
        frm.set_query('digital_asset', function() {
            return {
                filters: {
                    status: 'Available'
                }
            };
        });
    }
});