import { InMemoryLessonsRepository } from "../../test/repositories/InMemoryLessonsRepository";
import { CreateLesson } from "./CreateLesson";

describe("CreateLesson service", () => {
  it("should be able to create a new lesson", async () => {
    const inMemoryLessonsRepository = new InMemoryLessonsRepository();
    const createLesson = new CreateLesson(inMemoryLessonsRepository);

    await expect(
      createLesson.execute({ title: "Nova Aula", description: "Test" })
    ).resolves.not.toThrow();

    expect(inMemoryLessonsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: "Nova Aula",
        }),
      ])
    );
  });

  it("should NOT be able to create a new lesson with invalid title", async () => {
    const inMemoryLessonsRepository = new InMemoryLessonsRepository();
    const createLesson = new CreateLesson(inMemoryLessonsRepository);

    await expect(
      createLesson.execute({ title: "", description: "Test" })
    ).rejects.toThrow();

    expect(inMemoryLessonsRepository.items).toEqual([]);
  });
});
