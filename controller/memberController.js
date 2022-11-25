const { request, response } = require("express");
const { path } = require("../routes/member");
const memberModel = require("../models/index").member;
const Op = require("sequelize").Op;
const upload = require("./upload-image").single(`image`);

exports.getAllMember = async (req, res) => {
  let members = await memberModel.findAll();
  return res.json({
    success: true,
    data: members,
    message: "All Members have been loaded",
  });
};

exports.findMember = async (req, res) => {
  let name = req.body.name;
  let gender = req.body.gender;
  let address = req.body.address;

  let members = await memberModel.findAll({
    where: {
      [Op.or]: [
        { name: { [Op.substring]: name } },
        { gender: { [Op.substring]: gender } },
        { address: { [Op.substring]: address } },
      ],
    },
  });

  console.log(members)
  return res.json({
    success: true,
    data: members,
    message: "All Members have been loaded",
  });
};

exports.addMember = (request, response) => {
  /** run function upload */
  upload(request, response, async (error) => {
    /** check if there are errorwhen upload */
    if (error) {
      console.log("err");
      return response.json({ message: error });
    }
    /** check if file is empty */
    if (!request.file) {
      return response.json({ message: `Nothing file to Upload` });
    }
    /** prepare data from request */
    let newMember = {
      name: request.body.name,
      address: request.body.address,
      gender: request.body.gender,
      contact: request.body.contact,
      image: request.file.filename
    };
    console.log(newMember);
    memberModel
      .create(newMember)
      .then((result) => {
        return response.json({
          success: true,
          data: result,
          message: `New member has been inserted`,
        });
      })
      .catch((error) => {
        return response.json({
          success: false,
          message: error.message,
        });
      });
  });
};

exports.updateMember = async (request, response) => {
  let dataMember = {
    name: request.body.name,
    address: request.body.address,
    gender: request.body.gender,
    contact: request.body.contact,
  };
  if (request.file) {
    /** get selected book's data */
    const selectedMember = await memberModel.findOne({
      where: { id: id },
    });
    /** get old filename of cover file */
    const oldImageMember = selectedMember.image;
    /** prepare path of old cover to delete file */
    const pathImage = path.join(__dirname, `../image`, oldImageMember);
    /** check file existence */
    if (fs.existsSync(pathImage)) {
      /** delete old cover file */
      fs.unlink(pathImage, (error) => console.log(error));
    }
    member.image = request.file.filename;
  }
  /** execute update data based on defined id book */
  memberModel
    .update(dataMember, { where: { id: idMember } })
    .then((result) => {
      return response.json({
        success: true,
        message: `Data member has been updated`,
      });
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: error.message,
      });
    });
};

exports.deleteMember = (request, response) => {
  let idMember = request.params.id;
  memberModel
    .destroy({ where: { id: idMember } })
    .then((result) => {
      return response.json({
        success: true,
        message: `Data member has been updated`,
      });
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: error.message,
      });
    });
};
