package server.example.javaServer.dataAccess.concretes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.stereotype.Repository;
import server.example.javaServer.dataAccess.abstracts.UserDao;
import server.example.javaServer.model.info.UserFullNameInfo;
import server.example.javaServer.model.info.userTypes.UserInfo;
import server.example.javaServer.model.userTypes.User;

import java.util.List;


@Repository
public class UserDaoImpl implements UserDao {

    private final MongoOperations mongoOperations;

    @Autowired
    public UserDaoImpl(MongoOperations mongoOperations) {
        this.mongoOperations = mongoOperations;
    }

    @Override
    public UserFullNameInfo getUserNameAndSurnameByUserId(String userId, String collectionName) {
        return mongoOperations.findById(userId, UserFullNameInfo.class, collectionName);
    }

    @Override
    public <T extends UserInfo> T getUserInfo(String userId, String collectionName, Class<T> infoClass) {
        return mongoOperations.findById(userId, infoClass, collectionName);
    }

    @Override
    public <T extends User> List<T> getUserListFromCollection(String collectionName, Class<T> infoClass) {
        return mongoOperations.findAll(infoClass, collectionName);
    }


}
