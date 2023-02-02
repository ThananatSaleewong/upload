import PocketBase from "pocketbase";

const pb = new PocketBase("https://wide-army.pockethost.io");
pb.autoCancellation(false);
export default pb;
