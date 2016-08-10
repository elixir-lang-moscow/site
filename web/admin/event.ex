defmodule ElixirLangMoscow.ExAdmin.Event do
  use ExAdmin.Register
  alias ElixirLangMoscow.{Event, Registration}

  register_resource Event do
    menu priority: 1

    scope :all, default: true
    scope :upcoming, fn(q) ->
      now = Ecto.DateTime.utc
      where(q, [p], p.time_at > ^now)
    end

    # actions :all, only: [:index, :show, :create, :new]

    query do
      %{all: [preload: [:registrations, :event_speakers, :speakers]]}
    end

    show event do
      attributes_table do
        row :name
        row :location
        row :time_at
        row :uid
        row "Registration link", &(a(&1.registration_link, href: &1.registration_link))
      end

      panel "Speakers" do
        table_for event.event_speakers do
          column "Speaker", fn(item) -> auto_link item.speaker end
          column "Topic", fn(item) -> text item.title end
        end
      end

      attributes_table_for event do
        row "Max registrations", fn(event) ->
          text event.max_registrations
        end
        row "Registrations done", fn(event) ->
          text length(event.registrations)
        end
      end

      panel "Registrations" do
        table_for event.registrations do
          column "Fullname", fn(item) -> text Registration.full_name(item) end
          column "Email", fn(item) -> text item.email end
          column "Company", fn(item) -> text item.company end
        end
      end
    end

  end
end
