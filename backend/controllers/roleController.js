const Role = require('../models/role');

exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getRoleById = async (req, res) => {
  const { id } = req.params;
  try {
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.json(role);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.createRole = async (req, res) => {
  const { roleName, permissions } = req.body;
  try {
    const role = await Role.create({ roleName, permissions });
    res.status(201).json(role);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateRole = async (req, res) => {
  const { id } = req.params;
  const { roleName, permissions } = req.body;
  try {
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    await role.update({ roleName, permissions });
    res.json(role);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteRole = async (req, res) => {
  const { id } = req.params;
  try {
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    await role.destroy();
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};