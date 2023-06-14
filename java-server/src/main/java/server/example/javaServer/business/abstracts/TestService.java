package server.example.javaServer.business.abstracts;

import server.example.javaServer.core.utilities.results.dataResult.DataResult;
import server.example.javaServer.model.Test;
import server.example.javaServer.model.info.test.TestInfo;

import java.util.List;

public interface TestService {

    DataResult<List<Test>> getAll();

    DataResult<Test> getTestById(String testId);

    DataResult<TestInfo> getNameAndTestCodeById(String testId);

    DataResult<List<TestInfo>> getPatientCanSolveTests();

    DataResult<List<TestInfo>> getParentCanSolveTests();

    DataResult<List<TestInfo>> getTeacherCanSolveTests();
}
