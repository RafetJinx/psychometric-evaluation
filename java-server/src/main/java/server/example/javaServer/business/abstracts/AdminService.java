package server.example.javaServer.business.abstracts;

import server.example.javaServer.core.utilities.results.dataResult.DataResult;
import server.example.javaServer.model.userTypes.Admin;

import java.util.List;

public interface AdminService {

    DataResult<List<Admin>> getAll();
}
