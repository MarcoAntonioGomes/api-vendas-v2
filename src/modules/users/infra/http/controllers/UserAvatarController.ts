import AppError from '@shared/errors/AppError';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import UpdateUserAvatarService from '../../../services/UpdateUserAvatarService';
import { container } from 'tsyringe';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatar = container.resolve(UpdateUserAvatarService);
    const file = request.file;
    if (file) {
      const { filename } = file;
      const user = await updateAvatar.execute({
        user_id: request.user.id,
        avatarFilename: filename,
      });
      return response.json(instanceToInstance(user));
    } else {
      throw new AppError('Avatar File Inexist!');
    }
  }
}
