const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join( "db", "contacts.json");

const listContacts = async () => {
    const data = await fs.readFile(contactsPath);

    return JSON.parse(data);
}

const getContactById = async (contactId) => {
    const contacts = await listContacts();
    return contacts.find((contact) => contact.id === contactId) ?? null;
}
const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const removedContact = contacts.find((contact) => contact.id === contactId);

    if (!removedContact) {
      return null;
    }

    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));

    return removedContact;
}

const addContact = async (name, email, phone) => {
    const contacts = await listContacts();
    const newContact = { id: nanoid(), name, email, phone };
    const updatedContacts = [...contacts, newContact];

    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));

    return newContact;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const indexForUpdate = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  console.log(contactId);
  if (indexForUpdate === -1) {
    return null;
  }
  console.log(contactId);
  contacts[indexForUpdate] = { contactId, ...body };
  console.log(contacts[indexForUpdate]);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[indexForUpdate];
};

module.exports = { listContacts, getContactById, removeContact, addContact, updateContact };