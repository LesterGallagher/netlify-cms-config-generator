const yaml = require('yaml');
const fs = require('fs');

Array.prototype.last = function() { return this[this.length - 1]; }

const configYaml = yaml.parse(fs.readFileSync('./partial-config.yml', 'utf8'));

byName = _name => ({ name }) => _name === name;

const cmsCollectionFields = configYaml
    .collections
    .last()
    .files
    .last()
    .fields
    .find(byName('collections'))
    .fields;

const fields = cmsCollectionFields
    .find(byName('fields'));

const filesFields = cmsCollectionFields
    .find(byName('files'))
    .fields
    .find(byName('fields'));

const fieldsYaml = yaml.parse(fs.readFileSync('./fields.yml', 'utf8'));

const listField = fieldsYaml
    .find(byName('list'))
    .fields
    .find(byName('field'));

const listFields = fieldsYaml
    .find(byName('list'))
    .fields
    .find(byName('fields'));

const objectFields = fieldsYaml
    .find(byName('object'))
    .fields
    .find(byName('fields'));

let clone = JSON.stringify(fieldsYaml);

listField.options = JSON.parse(clone);
listFields.types = JSON.parse(clone);
objectFields.types = JSON.parse(clone);

clone = JSON.stringify(fieldsYaml);

fields.types = JSON.parse(clone);
filesFields.types = JSON.parse(clone);

fs.writeFileSync('config.yml', yaml.stringify(configYaml));

