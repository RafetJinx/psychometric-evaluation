package server.example.javaServer.dataAccess.abstracts;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import server.example.javaServer.model.userTypes.Parent;

import java.util.List;

@Repository
public interface ParentDao extends MongoRepository<Parent, String> {
    Parent getParentById(String parentId);
}
