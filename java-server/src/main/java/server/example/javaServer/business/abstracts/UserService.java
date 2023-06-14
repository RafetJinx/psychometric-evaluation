package server.example.javaServer.business.abstracts;

import server.example.javaServer.core.utilities.results.dataResult.DataResult;
import server.example.javaServer.model.info.UserFullNameInfo;
import server.example.javaServer.model.info.userTypes.UserInfo;

public interface UserService {

    DataResult<UserFullNameInfo> getUserNameAndSurnameByUserId(String userId);

    <T extends UserInfo> DataResult<T> getUserInfoByUserId(String userId);

    DataResult<UserInfo> getUserInfoIfUserRegistered(String username, String password);

    DataResult<String> getUserRole(String userId);
}
