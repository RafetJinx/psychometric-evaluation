package server.example.javaServer.business.concretes;

import io.swagger.models.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;
import server.example.javaServer.business.abstracts.UserService;
import server.example.javaServer.core.utilities.results.dataResult.DataResult;
import server.example.javaServer.core.utilities.results.dataResult.error.ErrorDataResult;
import server.example.javaServer.core.utilities.results.dataResult.success.SuccessDataResult;
import server.example.javaServer.dataAccess.abstracts.UserDao;
import server.example.javaServer.model.info.UserFullNameInfo;
import server.example.javaServer.model.info.userTypes.*;
import server.example.javaServer.model.userTypes.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserManager implements UserService {
    private UserDao userDao;
    private String[] collectionNames = {"admin", "doctor", "parent", "patient", "teacher"};

    @Autowired
    public UserManager(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public DataResult<UserFullNameInfo> getUserNameAndSurnameByUserId(String userId) {
        for (String collectionName : collectionNames) {
            UserFullNameInfo userInfo = userDao.getUserNameAndSurnameByUserId(userId, collectionName);
            if (userInfo != null) {
                return new SuccessDataResult<UserFullNameInfo>("User full name information found.", userInfo);
            }
        }

        return new ErrorDataResult<UserFullNameInfo>("User information cannot be found.", null);
    }

    @Override
    public <T extends UserInfo> DataResult<T> getUserInfoByUserId(String userId) {
        HashMap<String, UserInfo> collectionInfos = new HashMap<String, UserInfo>();
        collectionInfos.put("admin", new AdminInfo());
        collectionInfos.put("doctor", new DoctorInfo());
        collectionInfos.put("parent", new ParentInfo());
        collectionInfos.put("patient", new PatientInfo());
        collectionInfos.put("teacher", new TeacherInfo());

        for(Map.Entry<String, UserInfo> entry : collectionInfos.entrySet()){
            String key = entry.getKey();
            UserInfo value = entry.getValue();

            T userInfo = (T) userDao.getUserInfo(userId, key, value.getClass());
            if(userInfo != null){
                return new SuccessDataResult<T>("UserInfo found.", userInfo);
            }
        }

        return new ErrorDataResult<T>("UserInfo cannot be found.", null);
    }

    @Override
    public DataResult<UserInfo> getUserInfoIfUserRegistered(String username, String password) {
        HashMap<String, User> collectionInfos = new HashMap<String, User>();
        collectionInfos.put("admin", new Admin());
        collectionInfos.put("doctor", new Doctor());
        collectionInfos.put("parent", new Parent());
        collectionInfos.put("patient", new Patient());
        collectionInfos.put("teacher", new Teacher());

        for(Map.Entry<String, User> entry : collectionInfos.entrySet()){
            String key = entry.getKey();
            User value = entry.getValue();

            List<? extends User> userList = userDao.getUserListFromCollection(key, value.getClass());

            for(User user : userList){
                if(username.equals(user.getUsername()) && password.equals(user.getPassword())){
                    UserInfo userInfo = getUserInfoByUserId(user.getId()).getData();

                    return new SuccessDataResult<UserInfo>("User is registered", userInfo);
                }
            }
        }
        return new ErrorDataResult<UserInfo>("user is not registered", null);
    }

    @Override
    public DataResult<String> getUserRole(String userId) {
        HashMap<String, User> collectionInfos = new HashMap<String, User>();
        collectionInfos.put("admin", new Admin());
        collectionInfos.put("doctor", new Doctor());
        collectionInfos.put("parent", new Parent());
        collectionInfos.put("patient", new Patient());
        collectionInfos.put("teacher", new Teacher());

        for(Map.Entry<String, User> entry : collectionInfos.entrySet()){
            String key = entry.getKey();
            User value = entry.getValue();

            List<? extends User> userList = userDao.getUserListFromCollection(key, value.getClass());

            for(User user : userList){
                if(user.getId().equals(userId)){
                    return new SuccessDataResult<String>("User role is recieved", user.getRole());
                }
            }
        }
        return new ErrorDataResult<UserInfo>("user is not registered", null);
    }

}
