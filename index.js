const { Command } = require('commander');
const {
    listContacts,
    getContactById,
    addContact,
    removeContact
} = require('./contacts');

const program = new Command();
program
    .option('-a, --action <type>', 'choose action')
    .option('-i, --id <type>', 'user id')
    .option('-n, --name <type>', 'user name')
    .option('-e, --email <type>', 'user email')
    .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case 'list':
            try {
                const contacts = await listContacts();
                console.table(contacts);
            } catch (error) {
                console.log(error.message);
            }
            break;

        case 'get':
            try {
                const contact = await getContactById(id);
                console.table(contact);
            } catch (error) {
                console.log(error.message);
            }
            break;

        case 'add':
            try {
                const newContact = await addContact(name, email, phone);
                console.table(newContact);
            } catch (error) {
                console.log(error.message);
            }
            break;

        case 'remove':
            try {
                const deletedContact = await removeContact(id);
                console.table(deletedContact);
            } catch (error) {
                console.log(error.message);
            }
            break;

        default:
            console.warn('\x1B[31m Unknown action type!');
    }
}

invokeAction(argv);