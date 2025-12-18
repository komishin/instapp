# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

unless FileTest.method_defined?(:exists?)
  module FileTest
    class << self
      alias_method :exists?, :exist?
    end
  end
end

require_relative "config/application"
require_relative "config/environment"

Rails.application.load_tasks
