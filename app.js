const express = require("express");
const { ObjectId } = require("mongodb");
const { connectToDb, getDb } = require("./db");
const cors = require("cors");
// init app & middleware : phan mem trung gian

require("dotenv").config();
const app = express();

// Sử dụng middleware cors
app.use(
  cors({
    origin: [
      "http://localhost:58827",
      "https://learn-yourself-uef.web.app",
      "https://coopify.online",
    ],
  })
);

app.use(express.json());
// db connection
let db;
connectToDb((err) => {
  if (!err) {
    app.listen(process.env.PORT, () => {
      console.log("app listening on port 3000");
    });
    db = getDb();
  }
});

// routes

app.post("/books", (req, res) => {
  const book = req.body;
  db.collection("books")
    .insertOne(book)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json({ err: "khong the tim kiem document" });
    });
});
app.delete("/books/:id", (req, res) => {
  // dùng để check có tồn tại ID đó không (check hợp lệ)
  if (ObjectId.isValid(req.params.id)) {
    db.collection("books")
      .deleteOne({ _id: new ObjectId(req.params.id) }) // params la tham so yeu cau truyen vao và phải thêm new vào
      .then((result) => {
        res.status(200).json(result);
      })
      .catch(() => {
        res.status(500).json({ error: "khong the tim kiem document" });
      });
  } else {
    res.status(500).json({ error: "khong co id nay" });
  }
});

app.patch("/books/:id", (req, res) => {
  const update = req.body;
  // dùng để check có tồn tại ID đó không (check hợp lệ)
  if (ObjectId.isValid(req.params.id)) {
    db.collection("books")
      .updateOne({ _id: new ObjectId(req.params.id) }, { $set: update }) // params la tham so yeu cau truyen vao và phải thêm new vào
      .then((result) => {
        res.status(200).json(result);
      })
      .catch(() => {
        res.status(500).json({ error: "khong the tim kiem document" });
      });
  } else {
    res.status(500).json({ error: "khong co id nay" });
  }
});

// API USERS

// get all users
app.get("/users", (reg, res) => {
  let users = []; // tao mang de chua data trong collection

  db.collection("users")
    .find() // cursorr toArrat frEach
    .sort({ _id: 1 })
    .forEach((user) => users.push(user))
    .then(() => {
      res.status(200).json(users);
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "khong the tim kiem document", message: error });
    });

  //res.json({mssg: "Duong Anh Duc"})
});

// get user from id
app.get("/users/:id", (req, res) => {
  // dùng để check có tồn tại ID đó không (check hợp lệ)
  if (ObjectId.isValid(req.params.id)) {
    db.collection("users")
      .findOne({ _id: new ObjectId(req.params.id) }) // params la tham so yeu cau truyen vao và phải thêm new vào
      .then((user) => {
        res.status(200).json(user);
      })
      .catch(() => {
        res.status(500).json({ error: "khong the tim kiem document" });
      });
  } else {
    res.status(500).json({ error: "khong co id nay" });
  }
});

// get user from id
app.get("/users/:isAccount/:isPassword", (req, res) => {
  // dùng để check có tồn tại ID đó không (check hợp lệ)

  db.collection("users")
    .findOne({ account: req.params.isAccount, password: req.params.isPassword })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(() => {
      res.status(500).json({ error: "khong the tim kiem document" });
    });
});
// get user when forgot password
app.get("/forgot/:isGmail", (req, res) => {
  // dùng để check có tồn tại ID đó không (check hợp lệ)

  db.collection("users")
    .findOne({ gmail: req.params.isGmail })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(() => {
      res.status(500).json({ error: "khong the tim kiem document" });
    });
});

//

// post from id

app.post("/users", (req, res) => {
  const user = req.body;
  db.collection("users")
    .insertOne(user)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json({ err: "khong the tim kiem document" });
    });
});

// delete from id

app.delete("/users/:id", (req, res) => {
  // dùng để check có tồn tại ID đó không (check hợp lệ)
  if (ObjectId.isValid(req.params.id)) {
    db.collection("users")
      .deleteOne({ _id: new ObjectId(req.params.id) }) // params la tham so yeu cau truyen vao và phải thêm new vào
      .then((result) => {
        res.status(200).json(result);
      })
      .catch(() => {
        res.status(500).json({ error: "khong the tim kiem document" });
      });
  } else {
    res.status(500).json({ error: "khong co id nay" });
  }
});

// update from id

app.patch("/users/:id", (req, res) => {
  const update = req.body;
  // dùng để check có tồn tại ID đó không (check hợp lệ)
  if (ObjectId.isValid(req.params.id)) {
    db.collection("users")
      .updateOne({ _id: new ObjectId(req.params.id) }, { $set: update }) // params la tham so yeu cau truyen vao và phải thêm new vào
      .then((result) => {
        res.status(200).json(result);
      })
      .catch(() => {
        res.status(500).json({ error: "khong the tim kiem document" });
      });
  } else {
    res.status(500).json({ error: "khong co id nay" });
  }
});

// MÔN HỌC VÀ BÀI TẬP
app.get("/subject", (reg, res) => {
  // current page

  let subjects = []; // tao mang de chua data trong collection

  db.collection("subject")
    .find() // cursorr toArrat frEach
    .sort({ author: 1 })
    .forEach((subject) => subjects.push(subject))
    .then(() => {
      res.status(200).json(subjects);
    })
    .catch(() => {
      res.status(500).json({ error: "khong the tim kiem document" });
    });

  //res.json({mssg: "Duong Anh Duc"})
});

app.get("/subject/:id/", (req, res) => {
  db.collection("subject")
    .findOne({
      _id: new ObjectId(req.params.id),
    })
    .then((doc) => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ error: "Không tìm thấy môn học" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Không thể tìm kiếm tài liệu", error });
    });
});

// lấy môn học theo tên
app.get("/subject/search/:isName", (req, res) => {
  const subjectName = req.params.isName;

  db.collection("subject")
    .find({ name: { $regex: subjectName, $options: "i" } })
    .toArray()
    .then((docs) => {
      if (docs.length > 0) {
        res.status(200).json(docs);
      } else {
        res.status(404).json({ error: "Không tìm thấy môn học" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Không thể tìm kiếm tài liệu", error });
    });
});

//  Lấy tất cả các bài tập của môn học
app.get("/subject/:id/exercises", (req, res) => {
  let exercises = [];
  db.collection("subject")
    .aggregate([
      {
        $match: { _id: new ObjectId(req.params.id) },
      },
      {
        $lookup: {
          from: "exercises",
          localField: "idExercises",
          foreignField: "_id",
          as: "allExercises",
        },
      },
    ])
    // exercises = exercises.concat(subject.allExercises);
    .forEach((exercise) => exercises.push(exercise.allExercises))
    .then(() => {
      res.status(200).json(exercises);
    })
    .catch(() => {
      res.status(500).json({ error: "khong the tim kiem document" });
    });
});

//

// Lấy chi tiết bài tập theo id môn học, id bài tập
// app.get("/subject/:id/:exerciseId", (req, res) => {
//   let exercises = [];
//   const exerciseId = new ObjectId(req.params.exerciseId);

//   db.collection("subject")
//     .aggregate([
//       {
//         $match: { _id: new ObjectId(req.params.id) },
//       },
//       {
//         $lookup: {
//           from: "exercises",
//           localField: "idExercises",
//           foreignField: "_id",
//           as: "allExercises",
//         },
//       },
//       {
//         $project: {
//           allExercises: {
//             $filter: {
//               input: "$allExercises",
//               as: "exercise",
//               cond: { $eq: ["$exercise._id", exerciseId] },
//             },
//           },
//         },
//       },
//     ])
//     // exercises = exercises.concat(subject.allExercises);
//     .forEach((exercise) => exercises.push(exercise.allExercises))
//     .then(() => {
//       res.status(200).json(exercises);
//     })
//     .catch(() => {
//       res.status(500).json({ error: "khong the tim kiem document" });
//     });
// });

app.get("/subject/:id/:exerciseId", (req, res) => {
  const subjectId = new ObjectId(req.params.id);
  const exerciseId = new ObjectId(req.params.exerciseId);

  db.collection("subject")
    .aggregate([
      {
        $match: { _id: subjectId },
      },
      {
        $lookup: {
          from: "exercises",
          localField: "idExercises",
          foreignField: "_id",
          as: "allExercises",
        },
      },
      {
        $unwind: "$allExercises",
      },
      {
        $match: { "allExercises._id": exerciseId },
      },
      {
        $sort: { "allExercises.stt": 1 },
      },
      {
        $group: {
          _id: "$allExercises.subjectId",
          allExercises: { $push: "$allExercises" },
        },
      },
    ])
    .toArray()
    .then((result) => {
      if (result.length === 0) {
        res.status(404).json({ error: "Không tìm thấy document" });
      } else {
        res.status(200).json(result[0].allExercises);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Không thể tìm kiếm document" });
    });
});

app.get("/exercises/:id/", (req, res) => {
  db.collection("exercises")
    .findOne({
      _id: new ObjectId(req.params.id),
    })
    .then((doc) => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ error: "Không tìm thấy môn học" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Không thể tìm kiếm tài liệu", error });
    });
});

app.get("/exercises", (reg, res) => {
  let exercises_array = []; // tao mang de chua data trong collection

  db.collection("exercises")
    .find() // cursorr toArrat frEach
    .sort({ _id: 1 })
    .forEach((exercises) => exercises_array.push(exercises))
    .then(() => {
      res.status(200).json(exercises_array);
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "khong the tim kiem document", message: error });
    });
});

app.get("/version/:idVersion/", (req, res) => {
  db.collection("version_app")
    .findOne({
      _id: new ObjectId(req.params.idVersion),
    })
    .then((doc) => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ error: "Không tìm version môn học" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Không thể tìm thấy version", error });
    });
});
// ROMMATE API

// lấy tất cả roomMate
app.get("/roommates", (req, res) => {
  db.collection("room_mate")
    .find()
    .sort({ _id: 1 })
    .toArray()
    .then((roomMatesArray) => {
      res.status(200).json(roomMatesArray);
    })
    .catch((error) => {
      console.log("Lỗi truy vấn RoomMate:", error);
      res.status(500).json({ error: "Lỗi truy vấn RoomMate", error });
    });
});

// Lấy thông tin một RoomMate bằng ID
app.get("/roommate/:id", (req, res) => {
  const id = req.params.id;

  db.collection("room_mate")
    .findOne({ _id:new ObjectId(id) })
    .then((doc) => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ error: "Không tìm thấy RoomMate" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Lỗi truy vấn RoomMate", error });
    });
});

// Tạo một RoomMate mới
app.post("/roommate", (req, res) => {
  const roommate = req.body;

  db.collection("room_mate")
    .insertOne(roommate)
    .then((result) => {
      res.status(201).json(result.ops[0]);
    })
    .catch((error) => {
      res.status(500).json({ error: "Lỗi tạo mới RoomMate", error });
    });
});

// Cập nhật thông tin một RoomMate
app.patch("/roommate/:id", (req, res) => {
  const id = req.params.id;
  const updatedRoommate = req.body.sent;

  db.collection("room_mate")
    .updateOne({ _id: new ObjectId(id) }, { $push: {sent: updatedRoommate } })
    .then((result) => {
      if (result.modifiedCount > 0) {
        res.status(200).json({ message: "Cập nhật thông báo thành công" });
      } else {
        res.status(404).json({ error: "Không tìm thấy thông báo của người dùng" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Lỗi cập nhật thông báo", error });
    });
});
/// Cập nhật thành viên và số lượng
app.patch('/roommate/accept/:id', (req, res) => {
  const projectId = req.params.id;
  const updateData = req.body;

  // Kiểm tra xem dự án có tồn tại trong cơ sở dữ liệu không
  db.collection('room_mate') // Thay đổi tên bảng/collection của bạn tại đây
    .findOne({ _id: new ObjectId(projectId) })
    .then((project) => {
      if (!project) {
        return res.status(404).json({ message: 'Dự án không tồn tại' });
      }

      // Cập nhật các trường infoMembers nếu có trong req.body
      if (updateData.infoMembers && Array.isArray(updateData.infoMembers)) {
        project.infoMembers.push(...updateData.infoMembers);
      }
      // Cập nhật quantityCurently và quantityNeed nếu có trong req.body
      if (updateData.quantityCurently) {
        project.quantityCurently = updateData.quantityCurently;
      }
     

      // Thực hiện cập nhật vào cơ sở dữ liệu
      db.collection('room_mate') // Thay đổi tên bảng/collection của bạn tại đây
        .updateOne({ _id: new ObjectId(projectId) }, { $set: project })
        .then(() => {
          res.json({ message: 'Cập nhật thành công', project });
        })
        .catch((error) => {
          res.status(500).json({ error: 'Lỗi cập nhật dự án', error });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Lỗi truy vấn dự án', error });
    });
});



// Xóa một RoomMate
app.delete("/roommate/:id", (req, res) => {
  const id = req.params.id;

  db.collection("room_mate")
    .deleteOne({ _id: new ObjectId(id) })
    .then(() => {
      res.status(200).json({ message: "Xóa RoomMate thành công" });
    })
    .catch((error) => {
      res.status(500).json({ error: "Lỗi xóa RoomMate", error });
    });
});


// get room of user
app.get("/roommateyourself/:id", (req, res) => {
  const userId = req.params.id;

  db.collection("room_mate")
    .find({ "infoMembers.id": userId })
    .toArray()
    .then((docs) => {
      if (docs.length > 0) {
        res.status(200).json(docs);
      } else {
        res.status(404).json({ error: "Không tìm thấy Room của User" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Lỗi truy vấn Room của User", error });
    });
});


/// NOTI
app.get("/notifications", (req, res) => {
  db.collection("noti")
    .find()
    .sort({ "listnoti.timestamp": -1 })
    .toArray()
    .then((listNotiArray) => {
      res.status(200).json(listNotiArray);
    })
    .catch((error) => {
      console.log("Lỗi truy vấn listNotiArray:", error);
      res.status(500).json({ error: "Lỗi truy vấn listNotiArray", message: error });
    });
});

app.post("/notifications", (req, res) => {
  const notification = req.body; // Lấy thông tin notification từ body của request

  db.collection("noti")
    .insertOne(notification)
    .then(() => {
      res.status(201).json({ success: true, message: "Thêm thông báo thành công" });
    })
    .catch((error) => {
      console.log("Lỗi thêm thông báo:", error);
      res.status(500).json({ success: false, error: "Lỗi thêm thông báo", message: error });
    });
});





/* Nối 2 bangr noti và roomate
app.get("/getnotiroom/:id", (req, res) => {
  const idUser = new ObjectId(req.params.id);

  db.collection("noti")
    .aggregate([
      {
        $match: { _idUser: idUser },
      },
      {
        $lookup: {
          from: "room_mate",
          localField: "listnoti.idGroup",
          foreignField: "_id",
          as: "roomMates",
        },
      },
      {
        $unwind: "$roomMates",
      },
      {
        $project: {
          data: {
            $mergeObjects: ["$roomMates", { noti: "$listnoti" }],
          },
        },
      },
      {
        $sort: { "data.noti.timestamp": -1 },
      },
    ])
    .toArray()
    .then((result) => {
      if (result.length === 0) {
        res.status(404).json({ error: "Không tìm thấy document" });
      } else {
        const mergedData = result.map((item) => item.data);
        res.status(200).json(mergedData);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Không thể tìm kiếm document" });
    });
});
*/
// theo id  va sap xep
app.get("/notifications/:id", (req, res) => {
  const idUser = req.params.id;

  db.collection("noti")
    .aggregate([
      { $match: { _idUser: idUser } },
      { $unwind: "$listNoti" },
      { $sort: { "listNoti.timestamp": -1 } },
      {
        $group: {
          _id: "$_id",
          _idUser: { $first: "$_idUser" },
          newNoti:  { $first: "$newNoti" },
          listNoti: { $push: "$listNoti" },
         
        },
      },
    ])
    .toArray()
    .then((docs) => {
      if (docs.length > 0) {
        res.status(200).json(docs[0]);
      } else {
        res.status(404).json({ error: "Không tìm thấy thông báo của người dùng" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Lỗi truy vấn thông báo", error });
    });
});




// cap nhap 
app.patch("/notifications/:id", (req, res) => {
  const idUser = req.params.id;
  const updatedNoti = req.body; // Dữ liệu thông báo cần cập nhật

  db.collection("noti")
    .updateOne({ _idUser: idUser }, { $push: { listNoti: updatedNoti } })
    .then((result) => {
      if (result.modifiedCount > 0) {
        res.status(200).json({ message: "Cập nhật thông báo thành công" });
      } else {
        res.status(404).json({ error: "Không tìm thấy thông báo của người dùng" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Lỗi cập nhật thông báo", error });
    });
});
// cập nhật seen new noti
app.patch("/notifications/newnoti/:id", (req, res) => {
  const idUser = req.params.id;
  const seenNoti = req.body.newNoti; 

  db.collection("noti")
    .updateOne({ _idUser: idUser }, { $set: { newNoti: seenNoti } })
    .then((result) => {
      if (result.modifiedCount > 0) {
        res.status(200).json({ message: "Cập nhật thông báo thành công" });
      } else {
        res.status(404).json({ error: "Không tìm thấy thông báo của người dùng" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Lỗi cập nhật thông báo", error });
    });
});

// cập nhật seen từng noti
app.patch("/notifications/noti/:id/:timestamp", (req, res) => {
  const idUser = req.params.id;
  const timestamp = req.params.timestamp;
  const seenValue = req.body.seen; // Giá trị mới của trường "seen" (true/false)

  db.collection("noti")
    .findOneAndUpdate(
      { _idUser: idUser, "listNoti.timestamp": timestamp },
      { $set: { "listNoti.$.seen": seenValue } }
    )
    .then((result) => {
      if (result.value) {
        res.status(200).json({ message: "Cập nhật thông báo thành công" });
      } else {
        res.status(404).json({ error: "Không tìm thấy thông báo của người dùng" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Lỗi cập nhật thông báo", error });
    });
});


app.get("/Admin/user/:isaccount", (req, res) => {
  const account = req.params.isaccount;


  db.collection("users")
    .find({ account: { $regex: account, $options: "i" } })
    .toArray()
    .then((doc) => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ error: "Không tìm thấy user" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Lỗi truy vấn user to ADMin", error });
    });
});

app.get("/Admin/exercises/:sortName", (req, res) => {
  const sortName = req.params.sortName;


  db.collection("exercises")
    .find({ sortName: { $regex: sortName, $options: "i" } })
    .toArray()
    .then((doc) => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ error: "Không tìm thấy bài tâp" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Lỗi truy vấn ", error });
    });
});


// update id user vào bài tập 
app.patch('/Admin/exercises/accept/:id', (req, res) => {
  const exercisesId = req.params.id;
  const updateData = req.body;
  
  db.collection('exercises')
    .updateOne(
      { _id:  new ObjectId(exercisesId) }, 
      { $push: { listIdDonate: { $each: updateData.listIdDonate } } }
    )
    .then((result) => {
      if (result.modifiedCount > 0) {
        res.json({ message: 'Cập nhật thành công' });
      } else {
        res.status(404).json({ error: 'Không tìm thấy bài tập để cập nhật' });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'Lỗi cập nhật dự án', details: error });
    });
});



