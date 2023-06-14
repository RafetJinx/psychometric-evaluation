package server.example.javaServer.dataAccess.abstracts;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import server.example.javaServer.model.userTypes.Admin;

@Repository
public interface AdminDao extends MongoRepository<Admin, String> {
}
