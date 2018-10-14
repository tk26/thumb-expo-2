import { Permissions } from 'expo';

export default class PermissionService {
  static async hasCameraPermissions(){
    return await hasPermission(Permissions.CAMERA_ROLL);
  }
  static async requestCameraPermissions(){
    return await requestPermissions(Permissions.CAMERA_ROLL);
  }
}

const hasPermission = async(permissionType) => {
  const { status } = await Permissions.getAsync(permissionType);
  return status === "granted";
}
const requestPermissions = async(permissionType) => {
  const { status } = await Permissions.askAsync(permissionType);
  return status === "granted";
}
