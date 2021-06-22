const Member = require('./memberModel')

exports.contMembers = function () {
    return new Promise((resolve, reject) => {
        Member.countDocuments({}, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

exports.addMember = function (obj) {
    return new Promise((resolve, reject) => {
        let member = new Member({
            memberId: obj.id,
            name: obj.name,
            email: obj.email,
            city: obj.address.city
        });
        console.log(member)
        member.save(function (err) {
            if (err) {
                reject(err);
            } else {
                resolve('Created with id: ' + member._id)
            }
        })
    });
}