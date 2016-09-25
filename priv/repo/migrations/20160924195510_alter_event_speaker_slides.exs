defmodule ElixirLangMoscow.Repo.Migrations.AlterEventSpeakerSlides do
  use Ecto.Migration

  def change do
    alter table(:event_speakers) do
      add :speakerdeck_id, :string, default: nil
    end

  end
end
