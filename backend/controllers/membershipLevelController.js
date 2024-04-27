const MembershipLevel = require('../models/membershipLevel');

exports.getAllMembershipLevels = async (req, res) => {
  try {
    const membershipLevels = await MembershipLevel.findAll();
    res.json(membershipLevels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getMembershipLevelById = async (req, res) => {
  const { id } = req.params;
  try {
    const membershipLevel = await MembershipLevel.findByPk(id);
    if (!membershipLevel) {
      return res.status(404).json({ message: 'Membership Level not found' });
    }
    res.json(membershipLevel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.createMembershipLevel = async (req, res) => {
  const { levelName, discountRate, minimumPoints } = req.body;
  try {
    const membershipLevel = await MembershipLevel.create({ levelName, discountRate, minimumPoints });
    res.status(201).json(membershipLevel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateMembershipLevel = async (req, res) => {
  const { id } = req.params;
  const { levelName, discountRate, minimumPoints } = req.body;
  try {
    const membershipLevel = await MembershipLevel.findByPk(id);
    if (!membershipLevel) {
      return res.status(404).json({ message: 'Membership Level not found' });
    }
    await membershipLevel.update({ levelName, discountRate, minimumPoints });
    res.json(membershipLevel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteMembershipLevel = async (req, res) => {
  const { id } = req.params;
  try {
    const membershipLevel = await MembershipLevel.findByPk(id);
    if (!membershipLevel) {
      return res.status(404).json({ message: 'Membership Level not found' });
    }
    await membershipLevel.destroy();
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};