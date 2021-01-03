const db = require("../db.js");
const fs = require("fs");
jest.mock("fs");

describe("db", () => {
  afterEach(() => {
    fs.clearMocks();
  });
  it("can read", async () => {
    const arr = [{ title: "hi", done: true }];
    fs.setReadFileMock("/xxx", null, JSON.stringify(arr));
    const list = await db.read("/xxx");
    expect(list).toStrictEqual(arr);
  });
  it("can write", async () => {
    let fakeFile;
    fs.setWriteFileMock("/yyy", (path, data, callback) => {
      fakeFile = data;
      callback(null);
    });
    const list = [
      { title: "第一件事", done: true },
      { title: "第二件事", done: true },
    ];
    await db.write(list, "/yyy");
    expect(fakeFile).toBe(JSON.stringify(list) + "\n");
  });
});
