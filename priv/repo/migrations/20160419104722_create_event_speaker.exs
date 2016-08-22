defmodule ElixirLangMoscow.Repo.Migrations.CreateEventSpeaker do
  use Ecto.Migration

  def change do
    create table(:event_speakers) do
      add :title, :string
      add :description, :string
      add :slug, :string

      add :video_link, :string

      add :event_id, references(:events, on_delete: :nothing)
      add :speaker_id, references(:speakers, on_delete: :nothing)

      timestamps
    end

    create index(:event_speakers, [:event_id])
    create index(:event_speakers, [:speaker_id])

    create unique_index(:event_speakers, [:title])
    create unique_index(:event_speakers, [:slug])
    create unique_index(:event_speakers, [:video_link])
    
  end
end
