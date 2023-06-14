package server.example.javaServer.dataAccess.abstracts;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import server.example.javaServer.model.Test;

import java.util.List;

@Repository
public interface TestDao extends MongoRepository<Test, String> {

    Test getTestById(String testId);

    Test getNameAndTestCodeById(String testId);
}
