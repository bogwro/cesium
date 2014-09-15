require 'pathname'


namespace :cesium do

  desc 'fix relative to modular paths for requireJS'
  task :fix_requirejs_paths do

    Dir[File.join(Rake.original_dir, 'app', 'assets', 'javascripts', '**', '*.js')].each_with_index do |p, _|
      skip_if_folder = %w(ThirdParty)

      path = Pathname(p)
      dir = path.dirname
      dir_folder_name = dir.to_s.split('/').last

      #module_path = p.split('/javascripts/').last
      #puts "dir: #{dir}\nmodule: #{module_path}\n"

      unless skip_if_folder.include?(dir_folder_name)

        content = File.read p

        content.gsub!(/define\(\[([^\]]*)/ix) do |__|
          modules = $1.gsub(/\/\/\s*[^\n]*/ix, '').gsub(/\s/, '').gsub(/'|"/, '').split(',').collect! do |m|
            skip_if = %w(require exports '')
            m = m.strip
            if skip_if.include?(m)
              m
            else
              File.absolute_path(File.join(dir.to_s, m)).split('/javascripts/').last
            end
          end
          ret_str = modules.collect!{ |m| "'#{m}'" }.join(', ')
          "define([#{ret_str}"
        end

        File.open(p, 'w') do |file|
          file.write(content)
        end

      end
    end
  end
end
