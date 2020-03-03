import { UserFileDTO } from 'src/warcommands/commands/domain/file/model/user-file.dto';

export abstract class UserFilesRepositoryService {

    abstract addFileToUserFileList(file: UserFileDTO): void;

    abstract getUserFileList(): UserFileDTO[];



}
