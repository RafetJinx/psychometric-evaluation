package server.example.javaServer.business.abstracts.parent;

import server.example.javaServer.core.utilities.results.dataResult.DataResult;
import server.example.javaServer.model.AssignedTestToParent;

import java.util.List;

public interface ParentService {

    DataResult<List<String>> getRelatedPatientIdsByParentId(String parentId);

    DataResult<List<AssignedTestToParent>> getAssignedTestsByParentId(String parentId);
}
