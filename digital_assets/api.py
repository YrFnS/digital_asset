import frappe

@frappe.whitelist()
def update_asset_status(doc, method):
    # Fetch the digital asset record
    asset_doc = frappe.get_doc("Digital Asset", doc.digital_asset)

    # Check and update the custom status field
    if doc.status == "Active" and asset_doc.status == "Available":
        # Change asset status to 'In Use'
        frappe.db.set_value('Digital Asset', asset_doc.name, 'status', 'In Use')
        doc.assigned_date = frappe.utils.nowdate()
    elif doc.status == "Returned" and asset_doc.status == "In Use":
        # Change asset status to 'Available'
        frappe.db.set_value('Digital Asset', asset_doc.name, 'status', 'Available')
        doc.return_date = frappe.utils.nowdate()

    # Save the Digital Asset Assignment changes
    doc.db_set('status', doc.status)
    