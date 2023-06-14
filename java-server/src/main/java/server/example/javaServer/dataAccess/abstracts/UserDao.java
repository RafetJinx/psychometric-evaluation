package server.example.javaServer.dataAccess.abstracts;

import server.example.javaServer.model.info.UserFullNameInfo;
import server.example.javaServer.model.info.userTypes.UserInfo;
import server.example.javaServer.model.userTypes.User;

import java.util.List;

public interface UserDao {

    UserFullNameInfo getUserNameAndSurnameByUserId(String userId, String collectionName);

    <T extends UserInfo> T getUserInfo(String userId, String collectionName, Class<T> infoClass);

    <T extends User> List<T> getUserListFromCollection(String collectionName, Class<T> infoClass);
}
