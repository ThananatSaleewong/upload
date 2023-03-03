import PocketBase from "pocketbase";

const pb = new PocketBase("http://http://128.199.71.169/");
pb.autoCancellation(false);
export default pb;
