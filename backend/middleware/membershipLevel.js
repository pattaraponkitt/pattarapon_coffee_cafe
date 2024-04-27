const MembershipLevel = require('../models/membershipLevel');

exports.checkMembershipLevelExists = async (req, res, next) => {
  try {
    const membershipLevel = await MembershipLevel.findByPk(req.params.id);
    if (!membershipLevel) {
      return res.status(404).json({ message: 'Membership Level not found' });
    }
    req.membershipLevel = membershipLevel;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};