import { Meeting } from "domain/meetings/entities";
import { IMeetingRepository } from "domain/meetings/repository";
import { MeetingModel } from "./meeting.model"

export class MeetingRepository implements IMeetingRepository.Repository {
  async insert(entity: Meeting): Promise<void> {
    await MeetingModel.create(entity.toJSON());
  }

  async findAll(): Promise<Meeting[]> {
    const meetingsModel = await MeetingModel.findAll();
    return meetingsModel.map((meeting) => {
      return new Meeting(meeting.toJSON())
    });
  }

  async findById(id: string): Promise<Meeting> {
    const meetingModel = await MeetingModel.findOne({ where: { id } });
    if(!meetingModel) throw new Error("Meeting not found");
    return new Meeting(meetingModel.toJSON());
  }

  async update(entity: Meeting): Promise<void> {
    await MeetingModel.update(
      entity.toJSON(),
      {
        where: { id: entity.id },
      }
    )
  }

  async delete(id: string): Promise<void> {
      await MeetingModel.destroy({
        where: { id: id }
      })
  }
}

