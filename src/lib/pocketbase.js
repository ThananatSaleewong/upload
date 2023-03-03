import PocketBase from "pocketbase";

const pb = new PocketBase("https://pb.bethub.link/");
pb.autoCancellation(false);
export default pb;
