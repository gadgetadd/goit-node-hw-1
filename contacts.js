const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');


async function listContacts() {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    const requiredContact = contacts.find(contact => contact.id === contactId);
    return requiredContact ? requiredContact : null;
}

async function removeContact(contactId) {
    const contacts = await listContacts();
    const idx = contacts.findIndex(contact => contact.id === contactId);
    if (idx === -1) {
        return null
    };
    const deletedContact = contacts.splice(idx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return deletedContact;
}

async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
};

