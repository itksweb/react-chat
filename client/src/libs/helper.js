//get date in the format 12/06/2023
export const dayMonYear = (date) => {
  const day = date.getDate();
  const mon = date.getMonth() + 1;
  const year = date.getFullYear();
  return day + "/" + mon + "/" + year;
};

export const hourMinSec = (date) => {
  const hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  const min =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  const sec =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return hour + ":" + min + ":" + sec;
};

// converts timestamp to date/time in format
// 12/06/2023 if not today's date or
// 12:30:12 if it's today's date
export const timestampToDate = (timestamp) => {
  const nowDate = new Date(Date.now());
  const date = timestamp.toDate();
  const hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  const min =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  const sec =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  const time =
    dayMonYear(nowDate) === dayMonYear(date)
      ? hour + ":" + min + ":" + sec
      : dayMonYear(date);
  return time;
};

// firebase/firestore

//get all data in collection
export const getAllChats = async (getDocs, ref) => {
  const doc_refs = await getDocs(ref);
  const data = [];
  doc_refs.forEach((chat) => {
    data.push(chat.data());
  });
  return data;
};

// get specific firebase document by id
export const getOneChat = async (id) => {
  const d = await getDoc(doc(db, collection_name, id));
  const dNew = d.data().createdAt;
  return timestampToDate(dNew);
};
