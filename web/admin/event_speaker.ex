defmodule ElixirLangMoscow.ExAdmin.EventSpeaker do
  use ExAdmin.Register

  alias ElixirLangMoscow.{Event, Speaker, EventSpeaker, Repo}

  # TODO: why exception is raised?
  #
  # FunctionClauseError at GET /admin/event_speakers/2/edit
  # no function clause matching in Access.fetch/2

  register_resource EventSpeaker do
    menu priority: 2

    scope :all, default: true

    query do
      %{all: [preload: [:event, :speaker]]}
    end

    form admin do  # TODO: remove when the bug with ex_admin wiil be fixed
      inputs do
        input admin, :title
        input admin, :description
        input admin, :slug, type: :text
        input admin, :video_link

        input admin, :event, collection: Repo.all(Event)
        input admin, :speaker, collection: Repo.all(Speaker)
      end
    end

  end
end
