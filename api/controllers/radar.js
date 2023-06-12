import { db } from "../db.js";

export const getRadars = (req, res) => {
  const q = "SELECT * FROM Radar"

  db.query(q, (err, data) => {
    if (err) return res.status(500).send(err);

    console.log(data, 'data');
    return res.status(200).json(data);
  });
};

// export const getPost = (req, res) => {
//   const q =
//     "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? ";

//   db.query(q, [req.params.id], (err, data) => {
//     if (err) return res.status(500).json(err);

//     return res.status(200).json(data[0]);
//   });
// };

export const addRadar = (req, res) => {
  // const token = req.cookies.access_token;
  // if (!token) return res.status(401).json("Not authenticated!");

  // jwt.verify(token, "jwtkey", (err, userInfo) => {
  // if (err) return res.status(403).json("Token is not valid!");

  const q =
    "INSERT INTO Radar(`quadrant`, `ring`, `label`, `active`, `moved`,`desc`,`id`,`link`) VALUES (?)";

  console.log(req);
  const values = [
    req.body.quadrant,
    req.body.ring,
    req.body.label,
    req.body.active,
    req.body.moved,
    req.body.desc,
    req.body.id,
    req.body.link,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Post has been created.");
  });
  // });
};

export const deleteRadars = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json("You can delete only your post!");

      return res.json("Post has been deleted!");
    });
  });
};

// export const updatePost = (req, res) => {
//   const token = req.cookies.access_token;
//   if (!token) return res.status(401).json("Not authenticated!");

//   jwt.verify(token, "jwtkey", (err, userInfo) => {
//     if (err) return res.status(403).json("Token is not valid!");

//     const postId = req.params.id;
//     const q =
//       "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id` = ? AND `uid` = ?";

//     const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];

//     db.query(q, [...values, postId, userInfo.id], (err, data) => {
//       if (err) return res.status(500).json(err);
//       return res.json("Post has been updated.");
//     });
//   });
// };
